export const noValidation = {
  validatorCompiler: () => () => true,
  serializerCompiler: () => (data: JSON) => JSON.stringify(data),
}
