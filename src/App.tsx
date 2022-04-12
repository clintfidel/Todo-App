import React, {useState, useEffect} from 'react';
import { fetchTasks } from './features/tasks';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'

interface Itask {
  name : string,
  class: string,
  checked: boolean
}


interface ReduxState {
  tasks: {
    data: Itask[]
  }
}

function App() {
  const allTasks = useSelector((state: ReduxState) => state.tasks);
  const t : Itask[] = [];
  const s: string[] = [];
  const [tasks, setTasks] = useState(t);
  const [item, setItem] = useState('');
  const [selectedBox, setSelectedBox] = useState('');
  const [firstBoxClass, setFirstBoxClass] = useState('box-1 margin-right-10');
  const [secondBoxClass, setSecondBoxClass] = useState('box-2');
  const [firstFilterBoxClass, setFirstFilterBoxClass] = useState('box-1 margin-right-10');
  const [secondFilterBoxClass, setSecondFilterBoxClass] = useState('box-2');
  const [headerText, setHeaderText] = useState('Showing');
  // const [strikes, setStrikes] = useState(s);


  const dispatch = useDispatch();

  useEffect(() => {
    const jsonString = localStorage.getItem('tasks') || '[]';
    let tasks = JSON.parse(jsonString);
    dispatch(fetchTasks({data: tasks}));
  }, [])

  const addItem = (className: string): void => {
    const newTasks = [...allTasks.data];
    newTasks.push({
      name: item,
      class: className,
      checked: false
    });
    setTasks(newTasks);
    dispatch(fetchTasks({data: newTasks}));
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setItem('');
  }

  const filterItems = (className: string): void => {
    const taskJson = localStorage.getItem('tasks') || '[]';
    const filtered = JSON.parse(taskJson).filter((val: Itask) => {
      return val.class === className;
    });
    setTasks(filtered);
    dispatch(fetchTasks({data: filtered}));
    setHeaderText('Filtering and showing');
  }

  const updateTask = (index: number) => {
    const newtasks: Itask[] = [];
    allTasks.data.forEach((task, ind) => {
      if (index === ind) {
        newtasks.push({
          name: task.name,
          class: task.class,
          checked: !task.checked
        })
      } else {
        newtasks.push(task)
      }
    });

    setTasks(newtasks);
    dispatch(fetchTasks({data: newtasks}));
    localStorage.setItem('tasks', JSON.stringify(newtasks));
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (selectedBox) {
        addItem(selectedBox);
      } else {
        alert('You need to select a color!')
      }
    }
  }

  const renderedTodo = allTasks.data.map((task, index) => (
    <div className="all-tasks" key={index}>
      <div className={task.checked ? 'tasks strike' : 'tasks'}>
      <div className='task-input'>
        <input checked={task.checked} onClick={() => {
          updateTask(index);
        }} id="c1" type="checkbox"/>
        <p className='tasks-texts'>{task.name}</p>
      </div>
      <div className={task.class} />
    </div>
    <hr className='divider'/>
  </div>

  ))
  return (
    <div className="todo-app">
      <div className='todo-app-container'>
        <section className='date'>
          <p className='date-text'>{moment(Date.now()).format("[Today], MMMM Do YYYY" )}</p>
        </section>
        <section className='task-action'>
          <p className='task-action-text'>
            {headerText} {allTasks.data.length} task
          </p>
          <div className='colored-boxes'>
            <div className={firstFilterBoxClass}

              onClick={() => {
                filterItems('box-1');
                setFirstFilterBoxClass('box-1 margin-right-10 active-filter');
                setSecondFilterBoxClass('box-2');
              }}
             />
            <div className={secondFilterBoxClass}
              onClick={() => {
                filterItems('box-2');
                setFirstFilterBoxClass('box-1 margin-right-10');
                setSecondFilterBoxClass('box-2 active-filter');
              }}
            />
          </div>
        </section>
        {renderedTodo}
        <section className='tasks-item'>
          <div className='task-item-container'>

          </div>
        </section>
        
        <section className='add-task'>
          <div className='add-task-cont'>
            <div className='add-task-text-cont'>
              <p className='add-task-icon'> + </p>
              <input 
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className='add-task-text' 
                placeholder='Add New Item'
                value={item}
              />
            </div>
            <div className='colored-boxes'>
            <div onClick={() => {
              setSecondBoxClass('box-2');
              setFirstBoxClass('box-1 active-box margin-right-10');
              setSelectedBox('box-1');
            }} className={firstBoxClass} />
            <div className={secondBoxClass} onClick={() => {
              setSecondBoxClass('box-2 active-box');
              setFirstBoxClass('box-1 margin-right-10');
              setSelectedBox('box-2');
            }} />
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
