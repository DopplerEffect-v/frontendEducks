import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import platform

class usando_unittest(unittest.TestCase):

	def setUp(self):
		if (platform.system()=="Linux"):
			self.driver= webdriver.Chrome(executable_path=r"./chromedriver")
		else:
			self.driver= webdriver.Chrome(executable_path=r"./chromedriver.exe")
	
	def test_Ingreso_Correcto_Programas(self):
		driver= self.driver
		driver.get("http://54.162.5.155/")
		driver.maximize_window()
		time.sleep(1)
		
		usuario=driver.find_element_by_name("email")
		password=driver.find_element_by_name("password")
		usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
		password.send_keys("renzo123")
		password.send_keys(Keys.RETURN)
		time.sleep(3)
		#prueba
		comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
		comboBoxRoles.click()
		time.sleep(1)

		administrador=driver.find_element_by_id("1")
		administrador.click()
		time.sleep(3)

		buttonGestionarProgramas=driver.find_element_by_id("buttonGestionarProgramas")
		buttonGestionarProgramas.click()
		time.sleep(1)
		
		buttonNuevo=driver.find_element_by_id("buttonNuevo")
		buttonNuevo.click()
		time.sleep(1)
		
		inputSiglas=driver.find_element_by_name("siglas")
		inputNombrePrograma=driver.find_element_by_name("nombre")
		inputCorreo=driver.find_element_by_name("correoElectronico")
		inputSiglas.send_keys("MIN")
		inputNombrePrograma.send_keys("Ingeniería de Minas")
		inputCorreo.send_keys("minas@pucp.edu.pe")
		time.sleep(1)

		buttonBuscarResposable=driver.find_element_by_id("buttonBuscarResposable")
		buttonBuscarResposable.click()
		time.sleep(1)

		buttonSeleccionar=driver.find_elements_by_id("buttonSeleccionar")[0]
		buttonSeleccionar.click()
		time.sleep(1)

		buttonGuardar=driver.find_element_by_id("buttonGuardar")
		buttonGuardar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)

	def test_CamposVacios_AgregarPrograma(self):
		
		driver= self.driver
		driver.get("http://54.162.5.155/")
		#driver.maximize_window()
		time.sleep(1)
		
		usuario=driver.find_element_by_name("email")
		password=driver.find_element_by_name("password")
		usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
		password.send_keys("renzo123")
		password.send_keys(Keys.RETURN)
		time.sleep(5)
		
		#prueba
		comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
		comboBoxRoles.click()
		time.sleep(1)

		administrador=driver.find_element_by_id("1")
		administrador.click()
		time.sleep(3)
		

		#prueba
		titulo=driver.find_element_by_id("tituloPrograma")
		print(titulo.text)
		time.sleep(1)
		
		buttonGestionarProgramas=driver.find_element_by_id("buttonGestionarProgramas")
		buttonGestionarProgramas.click()
		time.sleep(1)

		#presionar Nuevo
		nuevo=driver.find_element_by_id("buttonNuevo")
		nuevo.click()
		time.sleep(3)
		#presionar Guardar
		guardar=driver.find_element_by_id("buttonGuardar")
		guardar.click()
		time.sleep(3)
		#presionar Aceptar
		aceptar=driver.find_element_by_id("buttonAceptar")
		aceptar.click()
		time.sleep(3)


		#ASSERTS
		errorSiglas=driver.find_element_by_id("typographyErrorSiglas")
		print(errorSiglas.text)
		assert "Por favor complete las siglas" == errorSiglas.text
		errorNombre=driver.find_element_by_id("typographyErrorNombrePrograma")
		print(errorNombre.text)
		assert "Por favor complete el nombre del programa" == errorNombre.text
		errorCorreo=driver.find_element_by_id("typographyErrorCorreo")
		print(errorCorreo.text)
		assert "Por favor complete el correo" == errorCorreo.text
		errorResposable=driver.find_element_by_id("typographyErrorResponsable")
		print(errorResposable.text)
		assert "Por favor seleccione un coordinador" == errorResposable.text

	def tearDown(self):
		self.driver.close()


if __name__ == '__main__':
	unittest.main()