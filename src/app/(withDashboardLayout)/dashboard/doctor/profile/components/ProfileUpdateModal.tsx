/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SNFullScreenModal from './../../../../../../components/Shared/SNModal/SNFullScreenModal';
import SNForm from './../../../../../../components/Forms/SNForm';
import { Button, Grid } from '@mui/material';
import SNInput from './../../../../../../components/Forms/SNInput';
import SNSelectField from './../../../../../../components/Forms/SNSelectField';
import { Gender } from './../../../../../../types/common';
import { FieldValues } from 'react-hook-form';
import MultipleSelect from './MultipleSelect';
import { useGetDoctorQuery, useUpdateDoctorMutation } from '@/redux/api/doctorApi';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

type TProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   id: string;
};

const validationSchema = z.object({
   experience: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   appointmentFee: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   name: z.string().optional(),
   contactNumber: z.string().optional(),
   registrationNumber: z.string().optional(),
   gender: z.string().optional(),
   qualification: z.string().optional(),
   currentWorkingPlace: z.string().optional(),
   designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
   const { data: doctorData, refetch, isSuccess } = useGetDoctorQuery(id);
   const {data: allSpecialties} = useGetAllSpecialtiesQuery({});
   const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

   const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();


   useEffect(() => {
      if (!isSuccess) return;

      setSelectedSpecialtiesIds(
         doctorData?.doctorSpecialties?.map((sp: any) => {
            return sp.specialtiesId;
         })
      );
   }, [isSuccess]);


   const submitHandler = async (values: FieldValues) => {
      const specialties = selectedSpecialtiesIds?.map(
         (specialtiesId: string) => ({
            specialtiesId,
            isDeleted: false,
         })
      );

      const excludedFields: Array<keyof typeof values> = [
         'email',
         'id',
         'role',
         'needPasswordChange',
         'status',
         'createdAt',
         'updatedAt',
         'isDeleted',
         'averageRating',
         'review',
         'profilePhoto',
         'registrationNumber',
         'schedules',
         'doctorSpecialties',
      ];

      const updatedValues = Object.fromEntries(
         Object.entries(values).filter(([key]) => {
            return !excludedFields.includes(key);
         })
      );

      updatedValues.specialties = specialties;

      try {
         updateDoctor({ body: updatedValues, id });
         await refetch();
         setOpen(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <SNFullScreenModal open={open} setOpen={setOpen} title='Update Profile'>
         <SNForm
            onSubmit={submitHandler}
            defaultValues={doctorData}
            resolver={zodResolver(validationSchema)}
         >
            <Grid container spacing={2} sx={{ my: 5 }}>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='name'
                     type='text'
                     label='Name'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='email'
                     type='email'
                     label='Email'
                     sx={{ mb: 2 }}
                     disabled
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='contactNumber'
                     label='Contract Number'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='address'
                     label='Address'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='registrationNumber'
                     label='Registration Number'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='experience'
                     type='number'
                     label='Experience'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNSelectField
                     items={Gender}
                     name='gender'
                     label='Gender'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='appointmentFee'
                     type='number'
                     label='AppointmentFee'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='qualification'
                     label='Qualification'
                     sx={{ mb: 2 }}
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='currentWorkingPlace'
                     label='Current Working Place'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <SNInput
                     name='designation'
                     label='Designation'
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <MultipleSelect
                     allSpecialties={allSpecialties}
                     selectedIds={selectedSpecialtiesIds}
                     setSelectedIds={setSelectedSpecialtiesIds}
                  />
               </Grid>
            </Grid>

            <Button type='submit' disabled={updating}>
               Save
            </Button>
         </SNForm>
      </SNFullScreenModal>
   );
};

export default ProfileUpdateModal;