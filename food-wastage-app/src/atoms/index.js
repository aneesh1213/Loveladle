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
    key:'gettngos', 
    default:[]
  })


  export const authState = atom({
    key:'authState', 
    default:{
      isAuthenticated : false,
      token : null,
      role : null
    }
  })

export const role = atom({
  key:'roleSelection', 
  default:{
    userRole:false,
    ngoRole:false
  }
})