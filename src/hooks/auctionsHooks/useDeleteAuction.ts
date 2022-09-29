import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAuction} from "../../service/auctionsService";
import {showNotification} from "@mantine/notifications";


export const useDeleteAuction = ()=> {
    const queryClient= useQueryClient();
    return useMutation(deleteAuction,{
        onSuccess:()=>{
            queryClient.invalidateQueries(['auctions'])
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