import netmask from 'netmask'

export function subnetsContainIp(subnets, ip) {
    let mask = 0
    try {
        let subnetsArr = subnets.split(',').map(net => net.trim())
        const result = subnetsArr.find(subnet => {
            if (!subnet) return {containIp: false, mask: mask}
            let block = new netmask.Netmask(subnet)
            if (block.contains(ip)) {
                mask = block.bitmask
                return true
            }
            return false
        })

        if (result) return {containIp: true, mask: mask}
        else return {containIp: false, mask: mask}
    } catch (e) {
        return {containIp: false, mask: mask}
    }

}
