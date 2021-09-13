import React, { useEffect, useState } from "react";
import "./styles.css";
import swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
/**
 * 
 * Crie um app para cadastrar o período, disciplina, professor (a) e carga horária. Para os campos período e professor deve criar uma combo box (caixa de combinação) para o usuário escolher as opções. Os dados devem ser listados em formato de tabela na parte inferior do formulário e com a opção de excluir. Salve as informações no local storage.
 * Guilherme Barroso
 * 202010422
 */
function Home() {
  const getLocalStorage = () => {
    const localStorageItems = localStorage.getItem('@regschoolSubjects:schoolSubjects');
    if(localStorageItems.length < 1 ) {
      return [];
    }
    const itemsValue = JSON.parse(localStorageItems);
    return itemsValue;
  }
  
  const [schoolSubjects, setSchoolSubjects]= useState(getLocalStorage());
  const handleDeleteSubmit = (id) => {
    swal.fire({
      title: 'Tem certeza que deseja apagar?',
      text: "Uma vez que o registro for excluido, não será possivel recuperar!",
      icon: 'warning',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const user = schoolSubjects.find(user => user.id == id);
        setSchoolSubjects(schoolSubjects.filter(u => u.id != user.id))
        swal.fire({
          text: 'Registro deletado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#33cc95'

        })
      }
    })

    
  } 
  useEffect(() => {
    const deleteAll = document.getElementById('deleteAll');
    schoolSubjects.length >= 2  ? deleteAll.style.display = "flex" : deleteAll.style.display = "none" 
  }, [schoolSubjects])
  useEffect(() => {
    localStorage.setItem('@regschoolSubjects:schoolSubjects', JSON.stringify(schoolSubjects));
  }, [schoolSubjects]);

  const handleDeleteAll = () => {
    swal.fire({
      title: 'Tem certeza que deseja apagar?',
      text: "Você está prestes a excluir TODOS os registros!",
      icon: 'error',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        setSchoolSubjects([]);
        swal.fire({
          text: 'Registros deletados com sucesso!',
          icon: 'success',
          confirmButtonColor: '#33cc95'

        })
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setSchoolSubjects([...schoolSubjects, {
      id: Date.now(),
      teacher: e.target.teacher.value,
      discipline: e.target.discipline.value,
      hourlyLoad: e.target.hourlyLoad.value,
      semester: e.target.semester.value

    }]);
  }
  return (
    
    <div className="page">
      <br/>
      <span className = "headerTitle">Cadastrar disciplinas</span>
     
      <form onSubmit = {handleSubmit} className="register">
        <input
          name="discipline"
          type="text"
          placeholder="Digite a disciplina"
          required
        />
        <input
          name="hourlyLoad"
          type="number"
          min = "1"
          placeholder="Digite a Carga Horaria"
          required
        />
        <select name = "teacher" defaultValue={'Thiaguinho'} >
          <option value = "Thiaguinho">Thiaguinho</option>
          <option value = "Robinho">Robinho</option>
          <option value = "Luiz Cláudio">Luiz Cláudio</option>
          <option value = "Débora">Débora</option>
          <option value = "Cadu">Cadu</option>
          <option value = "Osni">Osni</option>
        </select>
        <select name = "semester" defaultValue={'1'} >
          <option value = "1">1º Período</option>
          <option value = "2">2º Período</option>
          <option value = "3">3º Período</option>
          <option value = "4">4º Período</option>
          <option value = "5">5º Período</option>
          <option value = "6">6º Período</option>
          <option value = "7">7º Período</option>
          <option value = "8">8º Período</option>
        </select>
        <button type="submit">Enviar</button>
      </form>
      <br />
      <button className = "buttonDelete" id = "deleteAll" onClick = {handleDeleteAll}>Excluir todos</button>
      <br/>
      <table>
        <thead>
      
          <tr>
            <th>Nome da disciplina</th>
            <th>Carga Horaria</th>
            <th>Periodo</th>
            <th>Professor Responsavel</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {schoolSubjects.map((subject) => {
            return (
              <tr key = {subject.id}>
                <td>{subject.discipline}</td>
                <td>{subject.hourlyLoad}</td>
                <td>{subject.semester}º</td>
                <td>{subject.teacher}</td>
           
                <td>
                  <button className = "buttonDelete" onClick = {() => {
                    handleDeleteSubmit(subject.id);
                  }}><span className = "delete"> Excluir </span></button>
                </td>
              </tr>
         
            );
          })}
        </tbody>
      </table>
      
      <div id = "errors"></div>
      
    </div>
    
  );
}

export { Home };
