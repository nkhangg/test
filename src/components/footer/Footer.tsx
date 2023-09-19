import * as React from 'react';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope, faPhone, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export interface IFooterProps {

}

export default function Footer(props: IFooterProps) {
  return (
    <Grid container spacing={2} className='bg-slate-950'>
      <Grid item xs={12} lg={5}>

        <p className='text-cyan-600 font-bold text-3xl pl-6 pt-6'>Pet<span className='text-lime-600  font-bold text-3xl'>Foster</span> </p>
        <Grid item lg={2}>
          <div className='pl-6 pt-2'>
            <span className='border-b-2 border-slate-300 flex justify-center '></span>
          </div>
        </Grid>

        <p className='text-slate-50 text-justify pt-4 pl-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quam dolorem voluptate adipisci culpa architecto eum aut. Non fuga cumque consequatur, repellendus dolore modi voluptates architecto in eos aliquam expedita.</p>

      </Grid>
      <Grid item xs={12} lg={3}>
        <p className='text-lime-600 font-bold text-3xl pl-6 pt-6'>About Us</p>
        <Grid item lg={4}>
          <div className='pl-6 pt-2'>
            <span className='border-b-2 border-slate-300 flex justify-center '></span>
          </div>
        </Grid>
        <div className='pl-6 pt-4'>
          <ul className='list-inside'>
            <li>
              <a href='/login' className='text-slate-50'><FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy</a>
            </li>
            <li className='pt-6'>
              <a href='/login' className='text-slate-50'><FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy</a>
            </li>
            <li className='pt-6'>
              <a href='/login' className='text-slate-50'><FontAwesomeIcon icon={faAngleRight} /> Terms & privacy policy</a>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={12} lg={4}>
        <p className='text-lime-600 font-bold text-3xl pl-6 pt-6'>Contact Us</p>
        <Grid item lg={3}>
          <div className='pl-6 pt-2'>
            <span className='border-b-2 border-slate-300 flex justify-center '></span>
          </div>
        </Grid>
        <div className='pl-6 pt-4 pr-3'>
          <ul className='list-inside'>
            <li>
              <p className='text-slate-50'> <FontAwesomeIcon icon={faHouse} className='pr-2'/> 288, Nguyen Van Linh, An Khanh, Ninh Kieu, Can Tho</p>
            </li>
            <li className='pt-6'>
              <a href='/login' className='text-slate-50'><FontAwesomeIcon icon={faEnvelope} className='pr-2'/> inforpetfoster@gmail.com</a>
            </li>
            <li className='pt-6'>
              <a href='/login' className='text-slate-50'><FontAwesomeIcon icon={faPhone} className='pr-2'/> 0913842870</a>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item lg={12}>
        <div className='px-8'>
          <span className='border-b-2 border-slate-300 flex justify-center '>-----------</span>
        </div>

        <p className='text-slate-50 text-base pt-6 flex justify-center'>© 2023 PetFoster . All Rights Reserved.</p>
      </Grid>
    </Grid>
  );
}
