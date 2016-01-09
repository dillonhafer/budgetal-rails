module RSpec::Core
  class Reporter
    def start(expected_example_count, time=RSpec::Core::Time.now)
      @start = time
      @load_time = (@start - @configuration.start_time).to_f
      # notify :seed, Notifications::SeedNotification.new(@configuration.seed, seed_used?)
      notify :start, Notifications::StartNotification.new(expected_example_count, @load_time)
    end
  end
end
