import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  
export const showLogout = atom({
    key: 'showLogout', 
    default: false 
  });

