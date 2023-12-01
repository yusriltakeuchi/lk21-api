// ResponseDTO.ts

export interface StandardResponse<T extends object | any[] | null> {
    status: boolean;
    data: T;
}

export const SendResponse = <T extends object | any[] | null>(
    status: boolean,
    data: T
): StandardResponse<T> => {
    return {
        status: status,
        data: data
    };
};
