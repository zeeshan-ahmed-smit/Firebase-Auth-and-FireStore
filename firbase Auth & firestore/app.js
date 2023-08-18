const loginForm = document.getElementById('loginForm');
const loginPass = document.getElementById('loginPass');
const loginEmail = document.getElementById('loginEmail');
const loginBtn = document.getElementById('loginBtn');
const showRegFormBtn = document.getElementById('showRegFormBtn');
const showLogFormBtn = document.getElementById('showLogFormBtn');
const signUpForm = document.getElementById('signUpForm');
const signUpPass = document.getElementById('signUpPass');
const signUpEmail = document.getElementById('signUpEmail');
const signUpName = document.getElementById('signUpName');
const signUpNum = document.getElementById('signUpNum');
const registerBtn = document.getElementById('registerBtn');
const mainElem = document.querySelector('.main');
const LoginBtn2 = document.getElementById('LoginBtn2');
const pngImag1 = document.querySelector('.pngImag1');
const pngImag2 = document.querySelector('.pngImag2');
const loader = document.getElementById('loader');
const loader1 = document.getElementById('loader1');
const container = document.querySelector('.container');
const logOutBtn = document.getElementById('Logout-btn');
const main1 = document.getElementById('main1');
const main2 = document.getElementById('main2');
const name = document.getElementById('name');
const number = document.getElementById('number');
const email = document.getElementById('email');
const fileInput = document.getElementById('file-input');
const profileImage = document.getElementById('profileImage');


// Import firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA5Q469wRbDybSQHHpktny0uB5gp2J7lLI",
    authDomain: "my-web-415c3.firebaseapp.com",
    projectId: "my-web-415c3",
    storageBucket: "my-web-415c3.appspot.com",
    messagingSenderId: "839305854196",
    appId: "1:839305854196:web:954975fae6d3c2ad1332a1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
console.log(auth);

const db = getFirestore(app);
console.log(db);



// const uploadFile = (file) => {

//     return new Promise((resolve, reject) => {
//         const storageRef = ref(storage, `image/users/${file.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 reject(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     resolve(downloadURL)
//                 });
//             }
//         );
//     })
// };





//add data in fireStore
const addData = async (uid) => {
    let email = signUpEmail.value;
    let UserName = signUpName.value;
    let name = UserName[0].toUpperCase() + UserName.slice(1);
    let number = signUpNum.value;
    console.log(uid)
    await setDoc(doc(db, "users", uid), {
        name: name,
        phoneNumber: number,
        email: email,
    });
    console.log('data add successful')
}



//Register functionality
registerBtn && registerBtn.addEventListener('click', async () => {
    let email = signUpEmail.value;
    let password = signUpPass.value;
    container.classList.add('active');
    loader.classList.add('active');

    // New user signIn
    createUserWithEmailAndPassword(auth, email, password, signUpName)
        .then((userCredential) => {
            let user = userCredential.user;
            let uid = user.uid;
            loader.classList.remove('active');
            container.classList.remove('active');
            Swal.fire('Registration Successful Now You can Login :');
            loginForm.classList.add('active');
            signUpForm.classList.remove('active');
            mainElem.classList.add('active');
            console.log('successful signup user', user);
            addData(uid);
        })
        .catch((error) => {
            let errorMessage = error.message;
            console.log('error msg ', error);
            loader.classList.remove('active');
            container.classList.remove('active');
            if (errorMessage == 'Firebase: Error (auth/invalid-email).') {
                Swal.fire('Invalid Email Please Enter a Valid Email :');
            }
            else if (errorMessage == 'Firebase: Error (auth/missing-password).') {
                Swal.fire('Please Enter Password to Sign Up :');
            }
            else if (signUpName.value == '') {
                Swal.fire('Please fill Name field :');
            }
            else if (signUpNum.value == '') {
                Swal.fire('Please fill Number field :');
            }
            else if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                Swal.fire(`This ${email} is already registered with us.`);
            }
            else if (password.length <= 6) {
                Swal.fire('Your Password must be at least 6 characters long!');
            }
            else {
                Swal.fire('Something went wrong!')
            };
        });
});


//get data from firebase
const getData = async (uid) => {
    console.log(uid)
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    loader1.classList.remove('active');
    name.innerHTML = docSnap.data().name;
    number.innerHTML = docSnap.data().phoneNumber;
    email.innerHTML = docSnap.data().email;
}


// Login Functionality
loginBtn && loginBtn.addEventListener('click', async () => {

    const email = loginEmail.value;
    const password = loginPass.value;
    loader.classList.add('active');
    container.classList.add('active');

    // user login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            getData(uid);
            loader.classList.remove('active');
            loader1.classList.add('active');
            container.classList.remove('active');
            loginEmail.value = '';
            loginPass.value = '';
            mainElem.classList.remove('active');
            loginForm.classList.remove('active');
            main1.style.display = 'block';
            main2.style.display = 'none';
            console.log('successful login user ', user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("Error msg : ", errorMessage);
            loader.classList.remove('active');
            container.classList.remove('active');
            if (errorMessage == 'Firebase: Error (auth/invalid-email).') {
                Swal.fire('Invalid Email Please Enter a Valid Email :');
            }
            else if (errorMessage == 'Firebase: Error (auth/missing-password).') {
                Swal.fire('Please Enter Password to Login :');
            }
            else if (errorMessage == 'Firebase: Error (auth/wrong-password).') {
                Swal.fire('Incorrect Password! Try again.');
            }
            else if (errorMessage == 'Firebase: Error (auth/user-not-found).') {
                Swal.fire(`User with this email does not exist.`);
            }
            else if (password.length <= 6) {
                Swal.fire('Your Password must be at least 6 characters long!');
            }
            else {
                Swal.fire('Something went wrong!');
            };
        });
});



// Auto user Login
const autoUserLogin = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getData(user.uid);
            loader.classList.remove('active');
            loader1.classList.add('active');
            container.classList.remove('active');
            mainElem.classList.remove('active');
            loginForm.classList.remove('active');
            main1.style.display = 'block';
            main2.style.display = 'none';
            console.log('successful login user ', user)
        }
    });
}
autoUserLogin()

//logout user
logOutBtn && logOutBtn.addEventListener('click', () => {
    setTimeout(() => {
        auth.signOut();
        main1.style.display = 'none';
        main2.style.display = 'block';
        container.classList.remove('active');
        mainElem.classList.remove('active');
        LoginBtn2.style.display = 'block';
        loader.classList.remove('active');
        name.innerHTML = "";
        number.innerHTML = "";
        email.innerHTML = "";
        console.log('successful logout user ')
    }, 800)
});


//show signUp page
showLogFormBtn && showRegFormBtn.addEventListener('click', () => {
    signUpForm.classList.add('active');
    loginForm.classList.remove('active');
    loginEmail.value = '';
    loginPass.value = '';
});

// show login page
showLogFormBtn && showLogFormBtn.addEventListener('click', () => {
    signUpForm.classList.remove('active');
    loginForm.classList.add('active');
    signUpEmail.value = '';
    signUpPass.value = '';
    signUpName.value = '';
    signUpNum.value = '';
});

// show password login page
const checkBox = document.getElementsByName('checkBox');
checkBox[0] && checkBox[0].addEventListener('click', () => {
    if (checkBox[0].checked == true) {
        loginPass.type = 'text';
    } else {
        loginPass.type = 'password';
    };
});

//show password signUp page
checkBox[1] && checkBox[1].addEventListener('click', () => {
    if (checkBox[1].checked == true) {
        signUpPass.type = 'text';
    } else {
        signUpPass.type = 'password';
    };
});

//show Login form
LoginBtn2 && LoginBtn2.addEventListener('click', () => {
    loginForm.classList.add('active');
    mainElem.classList.add('active')
    loginForm.style.display = 'block'
});

//Exit login form
pngImag1 && pngImag1.addEventListener('click', () => {
    loginForm.classList.remove('active');
    mainElem.classList.remove('active');
    loginForm.style.display = 'none'
    loginEmail.value = '';
    loginPass.value = '';
});

//Exit SignUp form
pngImag2 && pngImag2.addEventListener('click', () => {
    signUpForm.classList.remove('active');
    mainElem.classList.remove('active');
    signUpForm.style.display = 'none'
    signUpEmail.value = '';
    signUpPass.value = '';
    signUpName.value = '';
    signUpNum.value = '';
});
