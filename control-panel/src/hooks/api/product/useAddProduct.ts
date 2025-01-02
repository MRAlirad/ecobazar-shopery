import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import apiConfig from "../config";

const useAddProduct = ()=> {
    const {path, queryKey} = apiConfig.product;
    return useMutation({
        mutationFn: (data: any) => apiClient.post(path, data)
    })
};