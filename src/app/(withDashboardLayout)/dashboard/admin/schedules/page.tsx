"use client";
import { Box, Button, Stack, IconButton, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import {useGetAllSchedulesQuery} from '@/redux/api/scheduleApi';
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [schedules, setSchedules] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const query: Record<string, any> = {};
    query['page'] = page;
    query['limit'] = limit;
    
    // const [deleteSchedule] = useDeleteScheduleMutation();
    const {data, isLoading} = useGetAllSchedulesQuery({...query});

    let pageCount;
console.log(data)

    if(data?.meta?.total){
        pageCount = Math.ceil(data?.meta?.total / limit)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

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
        <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
            <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Stack>
        {
                !isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={schedules ?? []}
                        columns={columns}
                        hideFooter
                    />
                </Box>) : (
                <Box>Loading...</Box>
            )
            }
            <Pagination color="primary" count={pageCount} page={page} onChange={handleChange} />
        </Box>
    );
};

export default SchedulesPage;