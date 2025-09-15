export const fetchPartners = async () =>{
    return new Promise<Partner[]>((resolve) => {
        setTimeout(() => {
            resolve(mockPartners)
        }, 1000)
    })
}

export const deletePartner = async (id: string) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(id)
        }, 500)
    })
}

export const uploadPartner = async (partner: { name: string; logo: File }) => {
    return new Promise<Partner>((resolve) => {
        setTimeout(() => {
            const newPartner = {
                id: String(mockPartners.length + 1),
                name: partner.name,
                logo: URL.createObjectURL(partner.logo),
            }
            mockPartners.push(newPartner)
            resolve(newPartner)
        }, 1000)
    })
}
export interface Partner {
  id: string
  name: string
  logo: string
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    id: "2",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: "3",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: "4",
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    id: "5",
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
]