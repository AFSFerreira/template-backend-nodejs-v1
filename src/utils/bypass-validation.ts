export const noValidation = {
  validatorCompiler: () => () => true,
  serializerCompiler: () => (data: any) => data,
}
