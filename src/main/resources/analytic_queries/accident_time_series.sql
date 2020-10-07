select distinct to_char(a, 'HH24:MI'), coalesce(a_data.count, 0) from(
SELECT cast(a as time)
FROM   generate_series(timestamp '2000-01-01 00:00'
    , timestamp '2000-01-02 23:00'
    , interval  '1 hr') t(a)) series
left join (
 select
        cast(date_trunc('hour', date_accident)as time) as time,
        count(1) as count
    from accidents
        where date_accident between #from_date and #to_date
    group by 1) a_data on a = a_data.time
    order by 1
