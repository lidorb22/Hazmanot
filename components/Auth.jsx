import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {useDispatch} from 'react-redux'
import {authPending, authSuccess, authFail} from '../Slices/authSlice'
import {getUserProfile} from '../Slices/userAction'
import {userLogin, userRegister} from '../api/userApi'
import {useSelector} from 'react-redux'

function Auth({acces}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState(true);

    const {error} =useSelector(state => state.auth);

    
    const dispatch = useDispatch();

    const handleSumbit = async (e) =>{
        e.preventDefault();
        dispatch(authPending());
        if(login){
            try {
                await userLogin({fullName, email});
                dispatch(authSuccess());
                dispatch(getUserProfile());
                acces(false);
            } catch (error) {
                console.log(error);
                dispatch(authFail('הפרטים המזהים אינם נכונים'));
            }
            return;
        }else{
            try {
                await userRegister({fullName, email});
                dispatch(authSuccess());
                dispatch(getUserProfile());
                acces(false);
            } catch (error) {
                console.log(error);
                dispatch(authFail('roung input'));
            }
            return;
        }
    }

    return (
        <motion.div 
        initial={{ opacity:0}}
        animate={{opacity: 1}}
        transition={{
            scale:{ type: "spring", stiffness: 100 },
          }}
        className={`${login? 'text-yellow-col' : 'text-white'} z-50 backdrop-blur-sm overflow-hidden absolute top-0 bg-opacity-90 text-yellow-col text-center bg-black w-full h-full grid grid-rows-6 grid-cols-1 pointer-events-auto`}>
            <p className="font-bold tracking-widest row-start-2 col-start-1 text-xl">{login ? "התחברות" : "הרשמה"}</p>
            <p className="row-start-2 col-start-1 self-center">ההרשמה לאתר היא כדי לספק אך ורק לכם</p>
            <p className="row-start-2 col-start-1 self-center pt-12">גישה לאזור האישי אז תזכרו את הפרטים</p>
            <p className="row-start-2 col-start-1 self-end pb-2">שאתם ממלאים</p>
            <form 
            method="post"
            onSubmit={e => handleSumbit(e)}
            className="row-start-4 row-span-2 col-start-1 w-full h-full grid grid-rows-4">
                <div className="row-start-1 row-span-2 col-start-1 flex flex-col text-black bg-white w-2/3 sm:w-72 justify-self-center h-3/4 rounded-3xl">
                    <div className="w-full h-1/2 flex">
                        <input
                        value={fullName}
                        onChange={e => setFullName(e.target.value)} 
                        type="text" 
                        className="focus:outline-none text-right ml-4 sm:ml-7 bg-transparent h-7 self-center w-40 border-b border-black" />
                        <label className="self-center pl-2">:שם מלא</label>
                    </div>
                    <div className="w-full h-1/2 flex">
                        <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        type="email" 
                        className="focus:outline-none ml-4 sm:ml-7 bg-transparent h-7 self-center w-40 border-b border-black" />
                        <label className="self-center pl-3">:אימייל</label>
                    </div>
                </div>
                <button className={`${login? 'bg-yellow-col text-black border-black' : 'bg-cyan-700 text-white border-white'} row-start-4 col-start-1 w-full font-bold tracking-widest border-t-2 border-b-2 h-10 z-10`}>{login ? "התחבר" : "הרשם"}</button>
                <p 
                onClick={() => setLogin(!login)}
                className={`${login? 'bg-yellow-col text-black' : 'bg-cyan-600 text-white'} col-start-1 row-start-4 self-end text-sm text-white cursor-pointer w-max px-5 rounded-lg justify-self-center`}>{login ? "אין לך משתמש? לחץ כאן להרשמה" : "יש לי כבר משתמש. לחץ כאן להתחברות"}</p>
            </form>
            {error &&<motion.div 
            initial={{ opacity:0}}
            animate={{opacity: 1}}
            transition={{
                scale:{ type: "spring", stiffness: 100 },
              }}
            className="flex flex-row items-center justify-center col-start-1 row-start-5 w-full h-10 self-center mb-14 border-t-2 border-b-2 border-black bg-orange-800">
                <motion.p
                initial={{ scale:0}}
                animate={{scale: 1}}
                transition={{
                    scale:{ type: "spring", stiffness: 100 },
                  }}
                className="font-bold tracking-widest text-white">{error}</motion.p>
            </motion.div>}
            <div className={`${login? 'bg-yellow-col text-black border-black' : 'bg-cyan-700 text-white border-white'} opacity-0 sm:opacity-100 absolute top-0 right-20 col-start-1 w-10 border-l-2 border-r-2 h-full`}></div>
        </motion.div>
    )
}

export default Auth
