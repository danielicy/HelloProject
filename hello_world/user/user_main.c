/*
	The hello world demo
*/

#include <ets_sys.h>
#include <osapi.h>
#include "user_interface.h"
#include <os_type.h>
#include <gpio.h>
#include "driver/uart.h"

#define DELAY 10000 /* milliseconds */

LOCAL os_timer_t hello_timer;
extern int ets_uart_printf(const char *fmt, ...);

/******************************************************************************
 *						Wifi Section
 *
 ******************************************************************************/

#pragma region Globals
const char* ssid = "TrojanVirus";                           // WIFI network name
const char* password = "";                       // WIFI network password
uint8_t connection_state = 0;                    // Connected to WIFI or not
uint16_t reconnect_interval = 10000;			// If not connected wait time to try again

#pragma endregion Globals

void wifiConnectCb(uint8_t status)
{
	/*if(status == STATION_GOT_IP){
		MQTT_Connect(&mqttClient);
	} else {
		MQTT_Disconnect(&mqttClient);
	}*/

	ets_uart_printf("Wifi ConnectedSuccesfully World!\r\n");
}



LOCAL void ICACHE_FLASH_ATTR start_wifi()
{
	WIFI_Connect(ssid,password,wifiConnectCb);
}


LOCAL void ICACHE_FLASH_ATTR hello_cb(void *arg)
{
	ets_uart_printf("Hello World!\r\n");
}

/******************************************************************************
 * FunctionName : user_rf_cal_sector_set
 * Description  : SDK just reversed 4 sectors, used for rf init data and paramters.
 *                We add this function to force users to set rf cal sector, since
 *                we don't know which sector is free in user's application.
 *                sector map for last several sectors : ABBBCDDD
 *                A : rf cal
 *                B : at parameters
 *                C : rf init data
 *                D : sdk parameters
 * Parameters   : none
 * Returns      : rf cal sector
*******************************************************************************/
uint32 ICACHE_FLASH_ATTR user_rf_cal_sector_set(void)
{
    enum flash_size_map size_map = system_get_flash_size_map();
    uint32 rf_cal_sec = 0;

    switch (size_map) {
        case FLASH_SIZE_4M_MAP_256_256:
            rf_cal_sec = 128 - 8;
            break;

        case FLASH_SIZE_8M_MAP_512_512:
            rf_cal_sec = 256 - 5;
            break;

        case FLASH_SIZE_16M_MAP_512_512:
        case FLASH_SIZE_16M_MAP_1024_1024:
            rf_cal_sec = 512 - 5;
            break;

        case FLASH_SIZE_32M_MAP_512_512:
        case FLASH_SIZE_32M_MAP_1024_1024:
            rf_cal_sec = 1024 - 5;
            break;

        default:
            rf_cal_sec = 0;
            break;
    }

    return rf_cal_sec;
}

void ICACHE_FLASH_ATTR user_rf_pre_init(void)
{
}

void ICACHE_FLASH_ATTR user_init(void)
{

	//ets_uart_printf("user_init starting\r\n");

	// Configure the UART
		uart_init(BIT_RATE_115200, BIT_RATE_115200);

		start_wifi();

	// Set up a timer to send the message
	// os_timer_disarm(ETSTimer *ptimer)
	os_timer_disarm(&hello_timer);
	// os_timer_setfn(ETSTimer *ptimer, ETSTimerFunc *pfunction, void *parg)
	os_timer_setfn(&hello_timer, (os_timer_func_t *)hello_cb, (void *)0);
	// void os_timer_arm(ETSTimer *ptimer,uint32_t milliseconds, bool repeat_flag)
	os_timer_arm(&hello_timer, DELAY, 1);
}
