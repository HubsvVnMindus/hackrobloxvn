//Copy đoạn mã SDK được Firebase cung cấp khi khởi tạo, dán vào file JS của dự án của bạn. Và tiếp tục thực hiện theo hướng dẫn trên video
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getDatabase, set, ref, } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";
  import { getAuth, createUserWithAndPassword, signInUserWithAndPassword, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQgI2bSyxLX9pcBBUASnPUtHQoQwDoE2Y",
    authDomain: "login-1e014.firebaseapp.com",
    projectId: "login-1e014",
    storageBucket: "login-1e014.firebasestorage.app",
    messagingSenderId: "920895151351",
    appId: "1:920895151351:web:4912a5150e11fd5403c7f2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
      //tính năng đăng ký
      document.addEventListener('DOMContentLoaded', function() {
        const signUpButton = document.getElementById('signUp');

        signUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const cpassword = document.getElementById('cPassword').value;

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Đã đăng kí
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password,
                    cpassword: cpassword,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage, 'signUpMessage');
            });
        });
      });

      //tính năng đăng nhập
      const signInButton = document.getElementById('signIn');
      if (signInButton) {
        signInButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('email_field').value;
            const password = document.getElementById('password_field').value;

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //đã đăng nhập
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'index.html';
                const dt = new Date();
                update(ref(database, 'users/'+ user.uid), {
                    last_login: dt,
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });
      }



      //Hàm này tạo ra để theo dõi trạng thái đăng nhập của người dùng
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        }else {
            //người dùng đã đăng xuất
        }
      });



  
