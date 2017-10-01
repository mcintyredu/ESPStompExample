package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class DeviceController {
	
    private SimpMessagingTemplate template;

    @Autowired
    public DeviceController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/buttons")
    public void handleClick(ButtonClickMessage inbound) {
    	
    	ToggleMessage outbound = new ToggleMessage();
    	
    	// Send a Toggle message to different topics depending on which button was clicked
    	if(inbound.getButton() == 0) {
    		outbound.setDevice("LED1");
        	this.template.convertAndSend("/commands/blink", outbound);
    	} else if(inbound.getButton() == 1) {
    		outbound.setDevice("DHT22");
        	this.template.convertAndSend("/commands/sample", outbound);
    	}
    }
    
    @MessageMapping("/sensors")
    public void handleReading(SensorReadingMessage inbound) {
    	
    	// Send the reading to the relevant topic
    	if(inbound.getName().equalsIgnoreCase("humidity")) {
    		this.template.convertAndSend("/readings/humidity", inbound);
    	} else if(inbound.getName().equalsIgnoreCase("temperature")) {
    		this.template.convertAndSend("/readings/temperature", inbound);
    	}
    }
}
