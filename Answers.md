# Soldier challenge answers

## Exercise 1
Create the database.

```shell
docker-compose up -d
```


## Exercise 2
On `user` table, the email should be unique.  
Be careful, in the `soldier` table you need to update the reference.

```sql
update soldier set soldier.created_by_id =
    (select id from user where email = (select email from user u where u.id = soldier.created_by_id) group by email having count(email) > 1)
    where created_by_id in (
    select u.id
    from user u
    inner join (
        select email, id from user group by email having count(email) > 1
    ) tmp on tmp.email = u.email where tmp.id < u.id
);

delete from user where id in (
    select u.id
    from user u
    inner join (
        select email, id from user group by email having count(email) > 1
    ) tmp on tmp.email = u.email where tmp.id < u.id
);

ALTER TABLE user ADD UNIQUE (email);
```

## Exercise 3
On `refresh_token` table, remove all line when the validity passed '2021/06/19' or when the email is not in the `user` table.

```sql
delete r from refresh_tokens as r where r.username not in (
    select email from user u where u.email = r.username
) 
or valid < '2021-06-19';
```

## Exercice 4
Create a table call `soldier_rank_type` who contains the list of rank.
After link each rank to a user.
if a user does not have rank, set rank to 'soldat_rank_unknow'.

```sql
create table soldier_rank_type (
    id int primary key auto_increment,
    rank varchar(255) not null unique
);

insert into soldier_rank_type(rank) (select unique soldier_rank from soldier);

insert into soldier_rank_type(rank) values ('soldat_rank_unknow');

alter table soldier add column rank_id int default null;

alter table soldier
    add foreign key (rank_id) references soldier_rank_type (id) on delete cascade;

update soldier s set s.rank_id = (select id from soldier_rank_type r where r.rank = s.soldier_rank);
```

## Exercice 5
In `soldier_image` table change the domain name 'lorempixel.com' by 'challenge.com'.

```sql
update soldier_image set secure_url = REPLACE(secure_url, 'lorempixel.com', 'challenge.com');
```

## Exercice 6
Create a table call `soldier_death_department`, who contains the list of death department in `soldier` table.
After link each death_department to a user with a column call `death_department_id`.

Create a table call `soldier_life_after_department`, who contains the list of life after department in `soldier` table.
After link each death_department to a user with a column call `life_after_department_id`.

```sql
create table soldier_death_department (
    id int primary key auto_increment,
    name varchar(255) not null unique
);

insert into soldier_death_department(name) (select unique death_department from soldier);

alter table soldier add column death_department_id int default null;

ALTER TABLE soldier
    ADD FOREIGN KEY (death_department_id) REFERENCES soldier_death_department (id) on delete cascade;

update soldier s set s.death_department_id = (select id from soldier_death_department dd where dd.name = s.death_department);
```

```sql
create table soldier_life_after_department (
    id int primary key auto_increment,
    name varchar(255) not null unique
);

insert into soldier_life_after_department(name) (select unique life_after_department from soldier);

alter table soldier add column life_after_department_id int default null;

ALTER TABLE soldier
    ADD FOREIGN KEY (life_after_department_id) REFERENCES soldier_life_after_department (id) on delete cascade;

update soldier s set s.life_after_department_id = (select id from soldier_life_after_department lad where lad.name = s.life_after_department);
```

```sql
alter table soldier drop column death_department;
alter table soldier drop column life_after_department;
```

## Exercise 7
Create a stored procedure, who take the department name in parameter and return the count of soldier who lived and die at the same place.  
Return the count with the key `nb_soldier`

```sql
DELIMITER //
create or replace procedure soldiersDieWhereTheyLived(department varchar(255))
    modifies sql data
begin
    declare exit handler for sqlexception

        begin
            rollback;
            resignal;
        end;

    start transaction;

     select @department_id := id from soldier_death_department where name = department;

    if @department_id is null then
        signal sqlstate '45000' set message_text = "Department does not exist";
    end if;

    select count(*) as nb_soldier from soldier where death_department_id = @department_id and life_after_department_id = @department_id;
    commit;
end;
//
DELIMITER ;
```

## Exercice 8
Create a stored procedure, who take two arguments, start_date and end_date of type date.  
This stored procedure return the nb of soldier added to the database between these dates and who was injured or/and killed (include start and end date) with two keys `nb_soldier_injured, nb_soldier_killed`

```sql
DELIMITER //
create or replace procedure getSolderInjuredOrKilled(start_date date, end_date date)
    modifies sql data
begin
    declare exit handler for sqlexception

begin
rollback;
resignal;
end;

start transaction;

if start_date > end_date then
        signal sqlstate '45000' set message_text = "start_date cannot be superior to end_date";
end if;

select @solder_injured := count(*) from soldier where date_creation >= start_date and date_creation <= end_date and injured = 1;
select @solder_killed := count(*) from soldier where date_creation >= start_date and date_creation <= end_date and killed = 1;

select @solder_injured as nb_soldier_injured, @solder_killed as nb_soldier_injured;

commit;
end;
//
DELIMITER ;
```
