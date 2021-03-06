create table if not exists `user` (
  `id` int primary key auto_increment,
  `email` varchar(255) unique,
  `batch_id` int,
  `is_admin` int not null default 0
);

create table if not exists `batch` (
  `id` int primary key auto_increment,
  `name` varchar(255) unique
);

create table if not exists `challenge` (
  `id` int primary key auto_increment,
  `name` varchar(255) unique,
  `batch_id` int not null,
  `is_close` int not null default 0
);

create table if not exists `score` (
  `id` int primary key auto_increment,
  `user_id` int,
  `challenge_id` int not null,
  `score` int not null,
  `first_try_at` datetime not null,
  `last_try_at` datetime not null
);

alter table `user` add foreign key (`batch_id`) references `batch` (`id`) on delete cascade;

alter table `score` add foreign key (`user_id`) references `user` (`id`) on delete cascade;

alter table `score` add foreign key (`challenge_id`) references `challenge` (`id`) on delete cascade;

alter table `challenge` add foreign key (`batch_id`) references `batch` (`id`) on delete cascade;
