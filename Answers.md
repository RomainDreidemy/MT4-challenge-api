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
    (select id from User where email = (select email from User u where u.id = soldier.created_by_id) group by email having count(email) > 1)
    where created_by_id in (
    select u.id
    from User u
    inner join (
        select email, id from User group by email having count(email) > 1
    ) tmp on tmp.email = u.email where tmp.id < u.id
);

delete from User where id in (
    select u.id
    from User u
    inner join (
        select email, id from User group by email having count(email) > 1
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

[//]: # (TODO:)

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
