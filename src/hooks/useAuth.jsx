
export default function useAuth(){
    const currentEmail = localStorage.getItem("roleId");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");

    return currentEmail &&  userId && email
}