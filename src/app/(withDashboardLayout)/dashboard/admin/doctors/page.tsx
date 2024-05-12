"use client";
import { useGetAllDoctorsQuery, useDeleteDoctorMutation } from "@/redux/api/doctorApi";
import { useDebounced } from "@/redux/hooks";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import { toast } from "sonner";
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const query: Record<string, any> = {};
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDoctor] = useDeleteDoctorMutation()
    
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    });
    
    if(!!debouncedTerm){
        query["searchTerm"] = searchTerm;
    }
    
    const { data, isLoading } = useGetAllDoctorsQuery({...query});


    const handleDelete = async (id: string) => {
        try{
            const res = await deleteDoctor(id).unwrap();
            if(res?.id){
                toast.success("Doctor deleted successful")
            }
        }
        catch(err:any){
            console.error(err.message)
        }
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
        { field: 'gender', headerName: 'Gender', flex: 1 },
        { field: 'appointmentFee', headerName: 'Appointment Fee', flex: 1 },
        {
            field: 'action', headerName: 'Action', flex: 1, headerAlign: "center", align: "center", renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton onClick={()=> handleDelete(row?.id)} aria-label="delete">
                            <DeleteIcon sx={{ color: "red" }}/>
                        </IconButton>
                        <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
                            <IconButton aria-label="delete">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </>
                )
            }
        },
    ];


    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
                <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search Specialties" size="small" />
            </Stack>
            {
                !isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={data?.doctors}
                        columns={columns}
                    />
                </Box>) : (
                <Box>Loading...</Box>
            )
            }
        </Box>
    );
};

export default DoctorsPage;