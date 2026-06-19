export const scheduleQuery = `
select 
	ts.*,
	tc.name as name
from tb_schedule ts  
inner join tb_class tc on tc.uuid = ts.classUuid 
inner join tb_school ts2 on ts2.uuid  = ts.schoolUuid 
where ts.schoolUuid = "@schoolUuid"
`;
