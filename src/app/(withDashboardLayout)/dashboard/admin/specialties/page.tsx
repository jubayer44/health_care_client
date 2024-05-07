"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SpecialistModal from "./components/SpecialistModal"
import { useGetAllSpecialtiesQuery, useDeleteSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const SpecialtiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetAllSpecialtiesQuery({});
    const [deleteSpecialty] = useDeleteSpecialtyMutation();

    const handleDelete = async (id: string) => {
        try{
            const res = await deleteSpecialty(id).unwrap();
            console.log(res)
        }
        catch(err:any){
            console.error(err.message)
        }
    }

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 400 },
        {
            field: 'icon', headerName: 'Icon', flex: 1, renderCell: ({ row }) => {
                return (<Box><Image src={row?.icon} alt="icon" height={20} width={20} /></Box>)
            }
        },
        {
            field: 'action', headerName: 'Action', flex: 1, headerAlign: "center", align: "center", renderCell: ({ row }) => {
                return (
                    <IconButton onClick={()=> handleDelete(row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                )
            }
        },
    ];

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
                <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField placeholder="Search Specialties" size="small" />
            </Stack>
            {
                !isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={data?.data}
                        columns={columns}
                    />
                </Box>) : (
                <Box>Loading...</Box>
            )
            }
        </Box>
    );
};

export default SpecialtiesPage;