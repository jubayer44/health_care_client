"use client";
import { Box, Stack, Button, IconButton } from '@mui/material';
import DoctorSchedulesModal from './components/DoctorSchedulesModal';
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from '@/utils/dateFormatter';
import { useGetMyScheduleQuery } from '@/redux/api/doctorScheduleApi';

const DoctorSchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [schedules, setSchedules] = useState([]);
    const {data, isLoading} = useGetMyScheduleQuery({});
    // const [deleteSchedule] = useDeleteScheduleMutation();

    console.log(data)

    const handleDelete = async (id: string) => {
        try{
            // const res = await deleteSchedule(id).unwrap();
            // console.log(res)
            // if(res?.success === true){
            //     toast.success("Doctor deleted successful")
            // }
        }
        catch(err:any){
            console.error(err.message)
        }
    }


    useEffect(()=> {
        const scheduleData = data?.data?.map((item: any) => {
            return {
                id: item?.id,
                startDate: dateFormatter(item?.startDateTime),
                endDate: dateFormatter(item?.endDateTime),
                startTime: dayjs(item?.startDateTime).format("hh:mm a"),
                endTime: dayjs(item?.endDateTime).format("hh:mm a"),
              };
        });

        setSchedules(scheduleData);
    }, [ data]); 


    const columns: GridColDef[] = [
        { field: 'startDate', headerName: 'Start Date', flex: 1 },
        { field: 'endDate', headerName: 'End Date', flex: 1 },
        { field: 'startTime', headerName: 'Start Time', flex: 1 },
        { field: 'endTime', headerName: 'End Time', flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
              return (
                <IconButton onClick={()=> handleDelete(row?.id)} aria-label="delete">
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              );
            },
          },
        ];
    return (
        <Box >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
            <DoctorSchedulesModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Stack>
            <Box sx={{mt: 5}}>
            {
                !isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={schedules ?? []}
                        columns={columns}
                    />
                </Box>) : (
                <Box>Loading...</Box>
            )
            }
            </Box>
        </Box>
    );
};

export default DoctorSchedulesPage;