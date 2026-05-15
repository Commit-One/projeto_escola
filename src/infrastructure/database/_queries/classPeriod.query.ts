export const classPeriodQuery = `
    SELECT 
        tcp.uuid,
        tc.name as className,
        tp.name as periodName,
        tcp.value,
        DATE_FORMAT(tcp.createdAt, '%d/%m/%Y') AS createdAt
    FROM tb_class_period tcp
    INNER JOIN tb_class tc on tc.uuid  = tcp.classUuid
    INNER JOIN tb_periodo tp on tp.uuid  = tcp.periodUuid
    WHERE  tcp.schoolUuid = "@SchoolUuid"
`;
