import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useRouter } from 'next/router'
import {inviteReset} from '../Slices/inviteSlice'

function Links() {
    const {isAuth} =useSelector(state => state.auth)
    const {link} =useSelector(state => state.invite)
    const router = useRouter();
    const dispatch = useDispatch();

    function backToMain(){
        router.push('/');
        dispatch(inviteReset());
    }

    useEffect(() => {
    if(!isAuth){
        router.push('/');
    }
    }, []);
  return (
    <div className="w-full h-screen grid grid-rows-6">
        <div className="z-10 flex flex-row items-center justify-center w-full h-5/6 row-start-1 row-span-2 col-start-1 bg-yellow-col">
            <div className="text-center space-y-2">
                <p className="font-bold tracking-widest text-xl">קישורים</p>
                <p>זה השלב האחרון מקווים שהסתדרתם</p>
                <p>ואהבתם את חווית היצירה</p>
            </div>
        </div>
        <div className="space-y-2 z-10 col-start-1 w-full h-full row-start-3 row-span-2 flex flex-col items-center justify-center">
            <div className="overflow-hidden bg-white w-3/4 h-2/6 rounded-xl shadow-2xl flex flex-col justify-center items-center ">
                <p className="break-all p-2">{link? `localhost:3000/invite/${link}`: "תקלה לא נמצא לינק"}</p>
            </div>
            <p>זה הקישור שאתם שולחים למוזמנים שלכם</p>
            <p>תהנו</p>
        </div>
        <div className="shadow-lg absolute bottom-20 right-0 w-full h-10 bg-yellow-col border-t-2 border-b-2 border-black flex flex-col items-center justify-center">
            <p onClick={() => backToMain()} className="font-bold">!העתקתי ושלחתי</p>
        </div>
        <div className="shadow-lg absolute top-0 right-9 w-10 h-full bg-yellow-col border-l-2 border-r-2 border-black"></div>
    </div>
  );
}

export default Links;
