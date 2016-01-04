watch('data/summary.yaml') do
  puts "#{Time.now} #{`make`}"
end
