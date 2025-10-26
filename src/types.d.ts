interface Paper {
    id: string 
    paper_id: string
    author: string
    domain: string 
    pdf_link : string
    published: string 
    reference_link : string 
    subdomain : string 
    summary : string 
    title : string
}

interface User {
    username: string
    _id: string 
}

interface AuthContextType {
    user: User | null,
    token: string | null,
    isLoading: boolean,
    signup: () => Promise<void>,
    login: () => Promise<void>,
    logout: () => Promise<void>,
    errors: {},
    setErrors: () => void,
    setIsLoading: () => void,
}