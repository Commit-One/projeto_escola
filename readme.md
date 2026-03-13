TODO: Cria entity de mensalidades

- studentUuid
- schoolUuid
- value
- monthReference
- dayReference
- yearReference
- status (pago, pendente, atradasa)
- discountApplied

TODO: Ao criar o aluno, enviar para fila de mensalidade

TODO: Criar regra de classe. Ao criar um estudante, verificar regra.

server
|
controllher
|
useCase
|
Application / Domain
|
Infra (Filas, banco, worker)
|
Banco
