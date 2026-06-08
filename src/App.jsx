import { useState, useEffect } from 'react';
import './index.css';

function TaskItem({ task, onDelete }) {
  return (
    <li className="item-row">
      <span>{task.name}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Hapus</button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, name: 'Beli modul LDR & Relay' },
        { id: 2, name: 'Pak Mati Lampu kerjakan UI Dashboard' }
      ]);
      setIsLoaded(true);
    }, 1000);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: inputValue
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Dashboard Team-Hub</h1>
        <p>Manajemen Persiapan Project & Inventaris</p>
      </div>

      <div className="card">
        <h2>Daftar Tugas & Barang</h2>

        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Contoh: Tambah stok Panel Surya..."
          />
          <button onClick={handleAddTask}>Tambah</button>
        </div>

        {!isLoaded ? (
          <p className="empty-state">Memuat data dari server...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-state">Belum ada tugas atau barang. Silakan tambah!</p>
        ) : (
          <ul className="item-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
