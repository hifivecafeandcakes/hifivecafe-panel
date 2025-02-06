import axios from 'axios';
import { useAuth } from './AuthProvider';
import Swal from 'sweetalert2';

export const loginUser = async (email, password, login, ipAddress) => {

  try {
    console.log("process.env.REACT_APP_API_UR");
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.REACT_APP_API_URL);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/login/token`,
      // `${process.env.REACT_APP_API_URL}/signin`,
      { uname: email, pw: password },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json',
        },
      }
    );

    console.log(response)
    if (response.data.Response.success == '1') {
      const token = response.data.Response.result[0].token;
      const name = response.data.Response.result[0].name;
      let admin_id = response.data.Response.result[0].admin_id;
      localStorage.setItem('admin_id', admin_id);
      console.log(admin_id);
      login(token)
      return { success: true, name };
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: response.data.Response.message,
      //   position: 'center',
      // });
      // alert('Please Enter Correct Username & Password');
      return { success: false, message: response.data.Response.message };

    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
