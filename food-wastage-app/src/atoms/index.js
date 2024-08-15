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


  export const gettngos = atom({
    key:'getNgoss', 
    default:[]
  })
