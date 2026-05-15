export const studentsQuery = `
    SELECT 
      ts.name,      
      ts.cpf,
      ts.matriculation,
      ts.uuid as studentUuid,      
      DATE_FORMAT(ts.dateBirth, "%d/%m/%Y") as dateBirth, 
      ts.status as status,
      ts.dayPayment,
      CONCAT(ts.discount, "%") as discount,
      case 
      	when ts.hasDiscount = 1 then "Sim"
      	when ts.hasDiscount = 0 then "Não"
      	else "Não"
      end
      as hasDiscount,
      DATE_FORMAT(ts.dateMatriculation, "%d/%m/%Y") as dateMatriculation,
      ts.phone,
      ts.nameFather,
      ts.nameMother,
      ts.age,
      ts.address,
      ts2.uuid as schoolUuid,
      ts2.name as schoolName,
      tp.uuid  as profileUuid,
      tp.name  as profileName,
      tp2.uuid as periodUuid,
      tp2.name as periodName,
      tc.name as className,
      tc.uuid as classUuid,
       CASE
        WHEN ts.hasDiscount = 0 THEN CONCAT('R$ ', FORMAT(tcp.value, 2))
        WHEN ts.hasDiscount = 1 THEN CONCAT(
          'R$ ',
          FORMAT((tcp.value - (tcp.value * ts.discount / 100)), 2)
        )
        ELSE CONCAT('R$ ', FORMAT(tcp.value, 2))
      END AS mensalidade
    FROM tb_student ts 
    inner join tb_school ts2 on ts2.uuid = ts.schoolUuid 
    inner join tb_profile tp on tp.uuid = ts.profileUuid 
    inner join tb_periodo tp2 on tp2.uuid = ts.periodUuid 
    inner join tb_class tc on tc.uuid = ts.classUuid
    INNER JOIN tb_class_period tcp 
    ON tcp.classUuid = tc.uuid 
  AND tcp.periodUuid = tp2.uuid 
    WHERE ts.schoolUuid = "@SchollUuid"
`;

export const studentStatisticsQuery = `
  SELECT 
	(
		SELECT COUNT(*) from tb_student
		WHERE status = "ACTIVE" and schoolUuid = "@SchollUuid"
	) as totalAtivo,
	(
		SELECT COUNT(*) from tb_student
		WHERE status = "INACTIVE" and schoolUuid = "@SchollUuid"
	) as totalInativo
FROM tb_student ;
`;
