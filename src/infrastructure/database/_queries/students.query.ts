export const studentsQuery = `
    SELECT 
      ts.name,
      ts.matriculation,
      ts.uuid as studentUuid,
      ts.dateBirth,
      ts.status as studentStatus,
      ts.dayPayment,
      ts.discount,
      ts.hasDiscount,
      ts.dateMatriculation,        
      ts.phone,
      ts.nameFather,
      ts.nameMother,
      ts2.uuid as schoolUuid,
      ts2.name as schoolName,
      tp.uuid  as profileUuid,
      tp.name  as profileName,
      tp2.uuid as periodUuid,
      tp2.name as periodName,
      tc.name as className,
      tc.uuid as classUuid
    FROM tb_student ts 
    inner join tb_school ts2 on ts2.uuid = ts.schoolUuid 
    inner join tb_profile tp on tp.uuid = ts.profileUuid 
    inner join tb_periodo tp2 on tp2.uuid = ts.periodUuid 
    inner join tb_class tc on tc.uuid = ts.classUuid
`;
