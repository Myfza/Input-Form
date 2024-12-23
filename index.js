document.addEventListener('DOMContentLoaded', function () {
    const inputMaxLengthOnLoad = document.getElementById('inputNama').maxLength;
    document.getElementById('sisaKarakter').innerText = inputMaxLengthOnLoad;
  
    document.getElementById('inputNama').addEventListener('input', function () {
      const jumlahKarakterDiketik = document.getElementById('inputNama').value.length;
      const jumlahKarakterMaksimal = document.getElementById('inputNama').maxLength;
  
      console.log('jumlahKarakterDiketik: ', jumlahKarakterDiketik);
      console.log('jumlahKarakterMaksimal: ', jumlahKarakterMaksimal);
      const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
      document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();
  
      if (sisaKarakterUpdate === 0) {
        document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai!';
      } else if (sisaKarakterUpdate <= 5) {
        document.getElementById('notifikasiSisaKarakter').style.color = 'red';
      } else {
        document.getElementById('notifikasiSisaKarakter').style.color = 'black';
      }
    });
  
    document.getElementById('inputNama').addEventListener('focus', function () {
      console.log('inputNama: focus');
      document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible';
    });
  
    document.getElementById('inputNama').addEventListener('blur', function () {
      console.log('inputNama: blur');
      document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
    });
  
    document.getElementById('inputCaptcha').addEventListener('change', function () {
        console.log('inputCaptcha: change');
        const inputCaptcha = document.getElementById('inputCaptcha').value;
        const submitButtonStatus = document.getElementById('submitButton');
        if (inputCaptcha === 'PRNU') {
          submitButtonStatus.removeAttribute('disabled');
        } else {
          submitButtonStatus.setAttribute('disabled', '');
        }
      });

      document.getElementById('formDataDiri').addEventListener('submit', function (event) {
        const inputCaptcha = document.getElementById('inputCaptcha').value;
    
        if (inputCaptcha === 'PRNU') {
          alert('Selamat! Captcha Anda lolos :D');
        } else {
          alert('Captcha Anda belum tepat :(');
          document.getElementById('submitButton').setAttribute('disabled', '');
        }
        event.preventDefault();
      });
      
      document.getElementById('inputCopy').addEventListener('copy', function () {
        alert('Anda telah men-copy sesuatu...');
      });
      document.getElementById('inputPaste').addEventListener('paste', function() {
        alert('Anda Telah Meng-paste Sebuah Teks');
    });
    });
    
  
    const todos = [];
    const RENDER_EVENT = 'render-todo';
    document.addEventListener(RENDER_EVENT, function () {
        const uncompletedTODOList = document.getElementById('todos');
        uncompletedTODOList.innerHTML = '';
    
        const completedTODOList = document.getElementById('completed-todos');
        completedTODOList.innerHTML = '';
       
       for (const todoItem of todos) {
          const todoElement = makeTodo(todoItem);
          if (!todoItem.isCompleted)
          uncompletedTODOList.append(todoElement);
          else
          completedTODOList.append(todoElement);
          
        }
      });  
        const submitForm = document.getElementById('form');
        submitForm.addEventListener('submit', function (event) {
          event.preventDefault();
          addTodo();
        });
      function addTodo() {
        const textTodo = document.getElementById('title').value;
        const timestamp = document.getElementById('date').value;
       
        const generatedID = generateId();
        const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
        todos.push(todoObject);
       
        document.dispatchEvent(new Event(RENDER_EVENT));
      }
      function generateId() {
        return +new Date();
      }
       
      function generateTodoObject(id, task, timestamp, isCompleted) {
        return {
          id,
          task,
          timestamp,
          isCompleted
        }
      }
      function makeTodo(todoObject) {
        const textTitle = document.createElement('h2');
        textTitle.innerText = todoObject.task;
       
        const textTimestamp = document.createElement('p');
        textTimestamp.innerText = todoObject.timestamp;
       
        const textContainer = document.createElement('div');
        textContainer.classList.add('inner');
        textContainer.append(textTitle, textTimestamp);
       
        const container = document.createElement('div');
        container.classList.add('item', 'shadow');
        container.append(textContainer);
        container.setAttribute('id', `todo-${todoObject.id}`);
    
        if (todoObject.isCompleted) {
            const undoButton = document.createElement('button');
            undoButton.classList.add('undo-button');
         
            undoButton.addEventListener('click', function () {
              undoTaskFromCompleted(todoObject.id);
            });
         
            const trashButton = document.createElement('button');
            trashButton.classList.add('trash-button');
         
            trashButton.addEventListener('click', function () {
              removeTaskFromCompleted(todoObject.id);
            });
         
            container.append(undoButton, trashButton);
          } else {
            const checkButton = document.createElement('button');
            checkButton.classList.add('check-button');
            
            checkButton.addEventListener('click', function () {
              addTaskToCompleted(todoObject.id);
            });
            
            container.append(checkButton);
          }
          function addTaskToCompleted (todoId) {
            const todoTarget = findTodo(todoId);
           
            if (todoTarget == null) return;
           
            todoTarget.isCompleted = true;
            document.dispatchEvent(new Event(RENDER_EVENT));
          }
          function findTodo(todoId) {
            for (const todoItem of todos) {
              if (todoItem.id === todoId) {
                return todoItem;
              }
            }
            return null;
          }
       
    
        return container;
    
      }
      