class ResultInterpreter

    def initialize(cart, destination_address, shipping_method)
        @cart = cart
        @destination_address = destination_address
        @shipping_method = shipping_method
      end
    
    def call
        # calculate shipping cost based on @cart, @destination_address, and @shipping_method
    end
end