import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import platform


class usando_unittest(unittest.TestCase):

    def setUp(self):
        if (platform.system() == "Linux"):
            self.driver = webdriver.Chrome(executable_path=r"./chromedriver")
        else:
            self.driver = webdriver.Chrome(
                executable_path=r"./chromedriver.exe")

    def test_Ingreso_Correcto_Resultado_Estudiante(self):
        driver = self.driver
        # driver.get("http://54.162.5.155/")
        driver.get("http://localhost:3000/")

        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)
        # prueba
        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        responsableProg = driver.find_element_by_id("2")
        responsableProg.click()
        time.sleep(3)


        buttonGestionarResultadosEst = driver.find_element_by_id("buttonGestionarResultadoEstudiante")
        buttonGestionarResultadosEst.click()
        time.sleep(1)

        buttonNuevo = driver.find_element_by_id("buttonNuevo")
        buttonNuevo.click()
        time.sleep(1)

        inputCodigo = driver.find_element_by_id("inputCodigo")
        inputSumilla = driver.find_element_by_id("txtSumilla")
        inputDescripcion = driver.find_element_by_id("txtDescripcion")
        inputCodigo.send_keys("RE_INF_01")
        inputSumilla.send_keys("Relacionar diseño informático con contexto.")
        inputDescripcion.send_keys("Aplicar el diseño de ingeniería para producir soluciones que satisfagan necesidades en contextos específicos.")
        time.sleep(1)


        buttonBuscarObjEd = driver.find_element_by_id("buttonAddObjEd")
        buttonBuscarObjEd.click()
        time.sleep(1)

        buttonSeleccionar = driver.find_elements_by_id("buttonSeleccionarObjetivo")[0]
        buttonSeleccionar.click()
        time.sleep(1)

        inputNiveles = driver.find_element_by_id("inputNiveles")
        inputNiveles.send_keys(Keys.ARROW_UP)  
        inputNiveles.send_keys(Keys.ARROW_UP) 
        time.sleep(1)

        inputLogroEsperado = driver.find_element_by_id("inputLogro")
        inputLogroEsperado.send_keys(Keys.BACKSPACE)      
        inputLogroEsperado.send_keys("70")          
        time.sleep(1)

        inputCodigoInd = driver.find_element_by_id("codIndicador_0")            
        inputCodigoInd.send_keys("RE01_IN01")          
        time.sleep(1)

        inputTituloInd = driver.find_element_by_id("tituloIndicador_0")            
        inputTituloInd.send_keys("Diseña una solución informática")          
        time.sleep(1)

        inputLogroIndNivel = driver.find_element_by_id("nivelLogro_0")            
        inputLogroIndNivel.send_keys("3")          
        time.sleep(1)

        driver.execute_script("scroll(0, 750)")

        inputNomDesc1 = driver.find_element_by_id("P_N_0_0")            
        inputNomDesc1.send_keys("Inicial")          
        time.sleep(1)

        inputDescNivel1 = driver.find_element_by_id("N_0_0")            
        inputDescNivel1.send_keys("Identifica los requisitos y los patrones de diseño de la solución informática.")          
        time.sleep(1)        

        inputNomDesc2 = driver.find_element_by_id("P_N_0_1")            
        inputNomDesc2.send_keys("En progreso")          
        time.sleep(1)

        inputDescNivel2 = driver.find_element_by_id("N_0_1")            
        inputDescNivel2.send_keys("Establece trazabilidad entre requisitos (priorizados) y patrones de diseño.")          
        time.sleep(1)

        inputNomDesc3 = driver.find_element_by_id("P_N_0_2")            
        inputNomDesc3.send_keys("Satisfactorio")          
        time.sleep(1)

        inputDescNivel3 = driver.find_element_by_id("N_0_2")            
        inputDescNivel3.send_keys("Diseña la solución informática considerando la mayoría de las restricciones y las necesidades a satisfacer.")          
        time.sleep(1)

        buttonGuardar = driver.find_element_by_id("buttonGuardar")          
        buttonGuardar.click()
        time.sleep(3)

        buttonAceptar = driver.find_element_by_id("btnAceptar")          
        buttonAceptar.click()
        time.sleep(3)

        textoCodigoCardResultadoEstudiante = driver.find_element_by_id("codigo_RE_INF_01")
        assert textoCodigoCardResultadoEstudiante.text == "RE_INF_01"

    def test_Ver_Modificar_Buscar_Eliminar_Resultado_Estudiante(self):
        driver = self.driver
        # driver.get("http://54.162.5.155/")
        driver.get("http://localhost:3000/")

        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)
        # prueba
        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        responsableProg = driver.find_element_by_id("2")
        responsableProg.click()
        time.sleep(3)


        buttonGestionarResultadosEst = driver.find_element_by_id("buttonGestionarResultadoEstudiante")
        buttonGestionarResultadosEst.click()
        time.sleep(1)


        buttonVer = driver.find_element_by_id("btnVer_RE_INF_01")
        buttonVer.click()
        time.sleep(1)

        buttonEditar = driver.find_element_by_id("btnEditar")
        buttonEditar.click()
        time.sleep(1)


        inputSumilla = driver.find_element_by_id("txtSumilla")
        inputSumilla.send_keys(Keys.BACKSPACE)  
        inputSumilla.send_keys(" y necesidades.")        
        time.sleep(1)

        buttonBuscarObjEd = driver.find_element_by_id("buttonAddObjEd")
        buttonBuscarObjEd.click()
        time.sleep(1)

        buttonSeleccionar = driver.find_elements_by_id("buttonSeleccionarObjetivo")[1]
        buttonSeleccionar.click()
        time.sleep(1)         

        buttonNuevo = driver.find_elements_by_id("buttonNuevo")
        print(buttonNuevo)
        time.sleep(1)
        buttonNuevo[0].click()
        time.sleep(1)
        #Llenar el segundo indicador
        inputCodigoInd = driver.find_element_by_id("codIndicador_1")            
        inputCodigoInd.send_keys("RE01_IN02")          
        time.sleep(1)

        inputTituloInd = driver.find_element_by_id("tituloIndicador_1")            
        inputTituloInd.send_keys("Elabora software")          
        time.sleep(1)

        inputLogroIndNivel = driver.find_element_by_id("nivelLogro_1")            
        inputLogroIndNivel.send_keys(Keys.BACKSPACE)
        inputLogroIndNivel.send_keys("3")          
        time.sleep(1)

        driver.execute_script("scroll(0, 750)")

        inputNomDesc1 = driver.find_element_by_id("P_N_1_0")            
        inputNomDesc1.send_keys("Inicial")          
        time.sleep(1)

        inputDescNivel1 = driver.find_element_by_id("N_1_0")            
        inputDescNivel1.send_keys("A partir de un diseño de software delimitado, el estudiante usa las herramientas de programación indicadas por el docente para crear el software correspondiente.")          
        time.sleep(1)        

        inputNomDesc2 = driver.find_element_by_id("P_N_1_1")            
        inputNomDesc2.send_keys("En progreso")          
        time.sleep(1)

        inputDescNivel2 = driver.find_element_by_id("N_1_1")            
        inputDescNivel2.send_keys("A partir de un diseño de software delimitado, el estudiante escoge y usa las herramientas de programación, dentro de un conjunto indicado por el docente, para crear el software correspondiente.")          
        time.sleep(1)

        inputNomDesc3 = driver.find_element_by_id("P_N_1_2")            
        inputNomDesc3.send_keys("Satisfactorio")          
        time.sleep(1)

        inputDescNivel3 = driver.find_element_by_id("N_1_2")            
        inputDescNivel3.send_keys("A partir de un diseño de software delimitado, el estudiante escoge y usa las herramientas de programación, dentro de un conjunto aprendido durante sus estudios, para crear el software correspondiente.")          
        time.sleep(1)
        

        buttonGuardar = driver.find_element_by_id("buttonGuardar")          
        driver.execute_script("arguments[0].scrollIntoView();", buttonGuardar)
        time.sleep(1)
        buttonGuardar.click()
        time.sleep(3)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")          
        buttonAceptar.click()
        time.sleep(3)
        
        inputBusqueda = driver.find_element_by_id("inputBusqueda")
        inputBusqueda.send_keys("RE_INF_01") 
        inputBusqueda.send_keys(Keys.ENTER)
        time.sleep(3)

        textoCodigoCardResultadoEstudiante = driver.find_element_by_id("codigo_RE_INF_01")
        assert textoCodigoCardResultadoEstudiante.text == "RE_INF_01"

        buttonEditar = driver.find_elements_by_id("btnEditar_RE_INF_01")
        buttonEditar[0].click()
        time.sleep(1)       

        buttonEliminarIndicador = driver.find_elements_by_id("eliminar_1")
        driver.execute_script("arguments[0].scrollIntoView();", buttonEliminarIndicador[0])
        time.sleep(3)
        buttonEliminarIndicador[0].click()
        time.sleep(1)  

        buttonGuardar = driver.find_element_by_id("buttonGuardar")          
        driver.execute_script("arguments[0].scrollIntoView();", buttonGuardar)
        time.sleep(1)
        buttonGuardar.click()
        time.sleep(3)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")          
        buttonAceptar.click()
        time.sleep(3)        

        buttonEliminar = driver.find_elements_by_id("btnEliminar_RE_INF_01")
        buttonEliminar[0].click()
        time.sleep(1)      

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
