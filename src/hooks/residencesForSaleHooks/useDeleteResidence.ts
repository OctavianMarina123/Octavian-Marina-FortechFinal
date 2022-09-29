import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteResidence} from "../../service/placesForSaleService";
import {showNotification} from "@mantine/notifications";


export const useDeleteResidence = ()=> {
    const queryClient= useQueryClient();
    return useMutation(deleteResidence,{
        onSuccess:()=>{
            queryClient.invalidateQueries(['residences'])
            showNotification({
                title: 'Deleted!',
                message: 'Successfully deleted!',
                styles: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.blue[6],
                        borderColor: theme.colors.blue[6],

                        '&::before': {backgroundColor: theme.white},
                    },

                    title: {color: theme.white},
                    description: {color: theme.white},
                    closeButton: {
                        color: theme.white,
                        '&:hover': {backgroundColor: theme.colors.blue[7]},
                    },
                }),
            })
        }
    })

}