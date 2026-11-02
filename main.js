const users = [
  {
    id: 1,
    name: "Đạt",
  },
];

const tasks = [
  {
    id: 1,
    userId: 1,
    title: "Học callback",
    completed: true,
  },
  {
    id: 2,
    userId: 1,
    title: "Học Promise",
    completed: true,
  },
  {
    id: 3,
    userId: 1,
    title: "Làm bài tập",
    completed: false,
  },
];

const incomplete = [
    {
        id: 4,
        userId: 1, 
        title: "Học async/await",
        completed: false,
    },

    {
        id: 5,
        userId: 1,
        title: "Hoc event loop",
        completed: false, 
    }
]

const emptyTasks = [];

function countCompleted(tasks) {
    const completed = tasks.filter(t => t.completed)

    return completed.length;
}

function getUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId === 1) {
            const user = users.find(user => user.id === userId);
            callback(null, user);
        } else {
            callback(new Error("Không tìm thấy người dùng"), null);
        }
    }, 1000);
}

function getTasksCallback(userId, callback) {
    setTimeout(() => {
        if (userId === 1) {
            const userTasks = tasks.filter(task => task.userId === userId);
            callback(null, userTasks);
        } else {
            callback(new Error("Không tìm thấy công việc cho người dùng này"), null);
        }
    }, 1500);
}

console.log("Bắt đầu");

getUserCallback(1, (error, user) => {
    if (error) {
        console.error(error.message);
        return;
    }

    console.log(`Đã lấy người dùng: ${user.name}`);

    getTasksCallback(user.id, (error, userTasks) => {
        if (error) {
            console.error(error.message);
            return;
        }

        console.log(`Đã lấy ${userTasks.length} công việc`);

        const completedCount = countCompleted(userTasks);
        console.log(`Hoàn thành: ${completedCount}/${userTasks.length}`);
    });
});

console.log("Code cấp script đã chạy xong");


function getUserPromise (userId) {
    return new Promise ( (resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                const user = users.find(user => user.id === userId);
                resolve(user);
            } else {
                reject(new Error("Không tìm thấy người dùng"));
            }
        }, 1000);
    })
}

function getTasksPromise (userId) {
    return new Promise ( (resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                const userTasks = tasks.filter(task => task.userId === userId);
                resolve(userTasks);
            } else {
                reject(new Error("Không tìm thấy công việc cho người dùng này"));
            }
        }, 1500);
    })
}


// async/ await
async function getUserAndTasks(userId) {
    try {
        const user = await getUserPromise(userId);
        const userTasks = await getTasksPromise(userId);

        console.log(`Đã lấy ${user.name}`);
        console.log(`Đã lấy ${userTasks.length} công việc`);
    } catch (error) {
        console.error(error.message);
    }

}
console.log ("Trước")
getUserAndTasks(1);
console.log("Sau");