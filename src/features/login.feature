Feature: Login de usuario
  Como usuario de la aplicación
  Quiero iniciar sesión con mis credenciales
  Para acceder a mi cuenta

  Scenario: Inicio de sesión exitoso
    Given que el usuario está en la página de login
    When ingresa su usuario y contraseña correctos
    And hace clic en el botón de login
    Then debería ver el mensaje de bienvenida
