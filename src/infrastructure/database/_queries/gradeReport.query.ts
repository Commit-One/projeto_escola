export const gradeReportQuery = `
  SELECT 
    ts.name as studentName,
    ts.matriculation as studentMatriculation,
    ts.cpf as studentCpf,
    ts.uuid as studentUuid,
    tc.name as className,
    tp.name as periodName,
    ts2.name as schoolName,
    ts2.uuid as schoolUuid,
    tac.name as academyCycle,
    tac.uuid as academyCycleUuid,
    td.name as disciplineName,
    td.uuid as disciplineUuid,
    tn.note,
    CASE 
      WHEN tn.note >= tm.media THEN TRUE
      ELSE FALSE 
    END AS isApproved
  FROM tb_notes tn
  INNER JOIN tb_student ts ON tn.studentUuid = ts.uuid
  INNER JOIN tb_discipline td ON tn.disciplineUuid = td.uuid
  INNER JOIN tb_class tc ON tn.classUuid = tc.uuid
  INNER JOIN tb_periodo tp ON tn.periodUuid = tp.uuid
  INNER JOIN tb_school ts2 ON tn.schoolUuid = ts2.uuid
  INNER JOIN tb_academic_cycle tac ON tn.academiccycleUuid = tac.uuid
  LEFT JOIN tb_media tm ON tm.schoolUuid = tn.schoolUuid
  WHERE tn.studentUuid = ?
`;
