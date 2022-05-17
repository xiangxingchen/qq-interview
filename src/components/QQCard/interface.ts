export interface QQInfo {
    code: number	//状态码
    qq?: string	// QQ
    name: string  // 昵称
    qlogo?: string	// QQ头像地址
    lvzuan?: object	// 绿钻相关信息
    msg?: string	 // 错误提示信息
}
