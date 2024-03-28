declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
      roleId(maxLength?: number): Rule
    }
  }