select distinct concat(a, ' - ', b), acc.count from
(SELECT cast(a as time)
FROM   generate_series(timestamp '2000-01-01 00:00'
    , timestamp '2000-01-02 23:00'
    , interval  '1 hr') t(a)) a
left join (
    SELECT cast(b as time)
    FROM   generate_series(timestamp '2000-01-01 00:00'
        , timestamp '2000-01-02 23:00'
        , interval  '1 hr') t(b)
    ) b on cast(a.a as time) + '1 hr' = cast(b.b as time)
join (
    select
        cast(date_trunc('hour', date_accident)as time) as time,
        count(1)
    from accidents
        where date_accident between #from_date and #to_date
    group by 1
) acc on a.a = acc.time
order by 1;
