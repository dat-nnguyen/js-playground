# JS Playground

Mở `index.html` trong Chrome và xem tab **Console** của DevTools.

## Các hàm

| Hàm | Cách chạy |
| --- | --- |
| `countCompleted(tasks)` | Chạy đồng bộ: dùng `filter` với một callback, trả số công việc đã hoàn thành. |
| `getUserCallback(id, callback)` | Sau timer 1 giây, chuyển user hoặc lỗi qua `callback(error, data)`. |
| `getTasksCallback(id, callback)` | Sau timer 1,5 giây, chuyển tasks hoặc lỗi qua callback. |
| `getUserPromise(id)` / `getTasksPromise(id)` | Trả Promise ngay; sau timer, gọi `resolve(data)` hoặc `reject(error)`. |
| `getUserAndTasks(id)` | `await` user → `await` tasks → in kết quả; xử lý lỗi bằng `try/catch`. |

ID `1` thành công; ID khác báo lỗi. Quy ước callback: thành công `(null, data)`, thất bại `(error, null)`.

## Luồng chạy

Hai luồng callback và async/await được khởi động độc lập:

- **Ngay lập tức:** in `Bắt đầu`, `Code cấp script đã chạy xong`, `Trước`, `Sau`; các timer đã được đăng ký.
- **Khoảng 1 giây:** mỗi luồng nhận user rồi đăng ký timer lấy tasks. Luồng callback in tên user.
- **Khoảng 2,5 giây:** nhận tasks. Luồng callback gọi `countCompleted`, in `Hoàn thành: 2/3`; luồng async/await in tên user và số tasks.

## Call stack, callback và Promise

- **Call stack:** gọi hàm thì thêm vào stack; hàm kết thúc thì lấy ra. Timer chờ bên ngoài stack.
- **Callback:** hàm được truyền vào hàm khác. Callback của `filter` chạy đồng bộ; callback của timer chạy sau, khi đủ thời gian và stack trống.
- **Promise:** biểu diễn kết quả sẽ có; executor của `new Promise` chạy ngay. Phần tiếp tục sau `await` chạy qua microtask khi stack trống, trước task tiếp theo.
- **Async/await:** hàm `async` luôn trả Promise. `await` chỉ tạm dừng hàm chứa nó, không chặn script; vì vậy `Sau` được in ngay.

## Đặt breakpoint

Chrome → DevTools → **Sources → main.js** → bấm số dòng → reload trang.

- Dòng **54, 98, 55, 57, 78**: xem đăng ký timer → script tiếp tục → timer gọi callback.
- Dòng **106, 132**: xem Promise được resolve → tiếp tục sau `await`.
- Dòng **93**, dùng **F11**: đi vào `countCompleted`; xem `tasks` và `completed` trong **Scope**.
