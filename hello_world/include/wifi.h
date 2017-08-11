/*
 * wifi.h
 *
 *  Created on: Aug 11, 2017
 *      Author: Danieli
 */

#ifndef INCLUDE_WIFI_H_
#define INCLUDE_WIFI_H_

#include "os_type.h"

typedef void (*WifiCallback)(uint8_t);
void ICACHE_FLASH_ATTR WIFI_Connect(uint8_t* ssid, uint8_t* pass, WifiCallback cb);


#endif /* INCLUDE_WIFI_H_ */