const taskFormDOM = document.getElementById('taskForm');
const taskDOM = document.getElementById('taskName');
const taskDateDOM = document.getElementById('taskDueDate');
const taskTimeDOM = document.getElementById('taskDueTime');
const taskSubjectDOM = document.getElementById('taskSubject');
const tasksDOM = document.getElementById('tasks');
const url = '/api/v1/tasks';

const schedule = [
    'Buried Cities and Lost Tribes',
    'Intro to Astronomy',
    'ASU Experience',
    'Principles of Programming',
    'Introduction to Engineering',
    'Calculus for Engineers'
];
for(let course of schedule) {
    taskSubjectDOM.innerHTML += `<option value="${course}">${course}</option>`;
}
taskSubjectDOM.innerHTML += `<option value="Other">Other</option>`;

const getAllTasks = async () => {
    try {
        const { data: { task } } = await axios.get(url);
        const sortedTasks = task.sort((a,b) => {return new Date(a.dueDate) - new Date(b.dueDate)});
        tasksDOM.innerHTML = (task.length > 0) ? '' : `<div class="task"><h2>Stay Cool</h2><h3>Life</h3><h3>Due: When I'm Dead</h3></div>`;
        sortedTasks.map((indTask) => {
            const date = indTask.dueDate.split('-');
            const time = indTask.dueTime.split(':');
            const formattedTime = `${(time[0] > 12) ? time[0]-12 : parseInt(time[0])}:${time[1]}${(time[0] > 12) ? 'pm' : 'am'}`;
            const formattedDate = (new Date(`${date[1]}/${date[2]}/${date[0]}`)).toLocaleDateString("en-US");
            const today = (new Date()).toLocaleDateString("en-US");
            const tomorrow = (new Date(Date.now() + 86400000)).toLocaleDateString("en-US");
            const yesterday = (new Date(Date.now() - 86400000)).toLocaleDateString("en-US");
            tasksDOM.innerHTML += `
            <div class="task">
                <h2>${indTask.task}</h2>
                <h3>${indTask.subject}</h3>
                <h4>Due ${(formattedDate == today) ? 'today' : (formattedDate == tomorrow) ? 'tomorrow' : (formattedDate == yesterday) ? 'yesterday' : formattedDate} at ${formattedTime}</h4>
                <button onclick="completeTask('${indTask._id}')">Complete</button>
            </div>
            `
        });
    } catch (err) {
        console.log(err);
    }
};
getAllTasks();

const addTask = async () => {
    try {
        const task = {
            task: taskDOM.value,
            dueDate: taskDateDOM.value,
            dueTime: taskTimeDOM.value,
            subject: taskSubjectDOM.value
        }
        console.log(task);
        await axios.post(url, task);
        taskFormDOM.reset();
        getAllTasks();
    } catch (err) {
        console.error(err);
    }
};

const completeTask = async (id) => {
    try {
        await axios.delete(`${url}/${id}`)
        getAllTasks();
    } catch (err) {
        console.error(err);
    }
};

taskFormDOM.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});