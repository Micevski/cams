
select concat(a, ' - ', b) g,
    c count
from (select *
      from generate_series(0, cast((select max(extract(year from age(date_of_birth))) from persons) + 5 as integer), 5) a
               left join generate_series(5,
                                         cast((select max(extract(year from age(date_of_birth))) from persons) + 5 as integer),
                                         5) b on a + 5 = b) as series
         join (select EXTRACT(year from (age(p.date_of_birth))) as year, cast(count(*) as bigint) as c
               from participant_passengers pp
                        join persons p on pp.passenger_person_id = p.id
                        join accident_participants ap on pp.accident_participant_id = ap.id
                        join accidents a2 on ap.accident_id = a2.id
               group by year) as years on year >= a and year < b;
